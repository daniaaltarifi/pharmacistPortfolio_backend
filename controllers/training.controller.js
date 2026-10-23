import * as trainingService from '../services/training.service.js'

export async function list(req, res) {
  const trainings = await trainingService.listTrainings()
  res.json({ data: trainings })
}

export async function getById(req, res) {
  const training = await trainingService.getTraining(req.params.id)
  res.json({ data: training })
}

export async function create(req, res) {
  const training = await trainingService.createTraining(req.body)
  res.status(201).json({ data: training })
}

export async function update(req, res) {
  const training = await trainingService.updateTraining(req.params.id, req.body)
  res.json({ data: training })
}

export async function remove(req, res) {
  await trainingService.deleteTraining(req.params.id)
  res.status(204).end()
}
