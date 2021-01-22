import * as Yup from 'yup';

import Uber from '../../services/Uber';

class TripController {
  async store(req, res) {
    // validar os dados informados na requisição
    const schema = Yup.object().shape({
      source: Yup.string().required(),
      destiny: Yup.string().required(),
    });

    // verificar se o corpo da requisição é valida
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação falhou! Favor informar origem e destino.' });
    }

    try {
      const value = await Uber(req.body);

      if (!value) {
        return res.status(400).json({
          error:
            'Não foi possivel verificar o valor, verifique os dados informados!',
        });
      }

      const trip = { ...req.body, value };

      return res.json(trip);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new TripController();
