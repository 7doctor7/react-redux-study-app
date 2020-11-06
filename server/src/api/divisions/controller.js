import { success, notFound } from '../../services/response';
import { Divisions } from '.';

export const create = ({ bodymen: { body } }, res, next) =>
  Divisions.create(body)
    .then((divisions) => divisions.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Divisions.count(query)
    .then((count) =>
      Divisions.find(query, select, cursor).then((divisions) => ({
        count,
        rows: divisions.map((divs) => divs.view()),
      })),
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Divisions.findById(params.id)
    .then(notFound(res))
    .then((divisions) => (divisions ? divisions.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Divisions.findById(params.id)
    .then(notFound(res))
    .then((divisions) => (divisions ? Object.assign(divisions, body).save() : null))
    .then((divisions) => (divisions ? divisions.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Divisions.findById(params.id)
    .then(notFound(res))
    .then((divisions) => (divisions ? divisions.remove() : null))
    .then(success(res, 204))
    .catch(next);
