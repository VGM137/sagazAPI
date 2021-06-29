const express = require('express');
const corsHandler = require('../utils/middleware/corsHandler')
const { GuisadosService } = require('../services/guisados.js');

const {
  guisadosIdSchema,
  createGuisadoSchema,
  updateGuisadoSchema
} = require('../utils/schemas/guisados')

const validationHandler = require('../utils/middleware/validationHandler');

const cacheRespose = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function guisadosApi(app) {
  const router = express.Router();
  app.use("/api/guisados", router);
/*   app.use(corsHandler()); */
  
  const guisadosService = new GuisadosService()

  router.get("/", corsHandler(), async function(req, res, next){
    cacheRespose(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query

    try{
      const guisados = await guisadosService.getGuisados({ tags });
      
      res.status(200).json({
        data: guisados,
        message: 'guisados listed'
      });
    }catch(err){
      next(err)
    }
  });

  router.get("/:guisadoId", validationHandler({ guisadoId: guisadosIdSchema }, 'params'), async function(req, res, next){
    cacheRespose(res, SIXTY_MINUTES_IN_SECONDS);
    const { guisadoId } = req.params;

    try{
      const guisado = await guisadosService.getGuisado({ guisadoId });
      res.status(200).json({
        data: guisado,
        message: 'guisado retrived'
      });
    }catch(err){
      next(err)
    }
  });

  router.post("/", validationHandler(createGuisadoSchema), async function(req, res, next){
    const { body: guisado } = req;

    try{
      const createGuisadoId = await guisadosService.createGuisado({ guisado });
      res.status(201).json({
        data: createGuisadoId,
        message: 'guisados created'
      });
    }catch(err){
      next(err)
    }
  });

  router.put("/:guisadoId", validationHandler({ guisadoId: guisadosIdSchema }, 'params'), validationHandler(updateGuisadoSchema), async function(req, res, next){
    const { guisadoId } = req.params;
    const { body: guisado } = req;
    
    try{
      const updateGuisadoId = await guisadosService.updateGuisado({ guisadoId, guisado });
      res.status(200).json({
        data: updateGuisadoId,
        message: 'guisado updated'
      });
    }catch(err){
      next(err)
    }
  });

  router.delete("/:guisadoId", validationHandler({ guisadoId: guisadosIdSchema }, 'params'),  async function(req, res, next){
    const { guisadoId } = req.params;
    
    try{
      const deleteGuisadoId = await guisadosService.deleteGuisado({ guisadoId });
      res.status(200).json({
        data: deleteGuisadoId,
        message: 'guisado deleted'
      });
    }catch(err){
      next(err)
    }
  });

}

module.exports = guisadosApi;