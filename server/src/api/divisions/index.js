import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';

export Divisions, { schema } from './model';

const router = new Router();
const { name, authorID, description } = schema.tree;

/**
 * @api {post} /divisions Create divisions
 * @apiName CreateDivisions
 * @apiGroup Divisions
 * @apiParam name Divisions's name.
 * @apiParam createdBy Divisions's createdBy.
 * @apiParam createdDate Divisions's createdDate.
 * @apiParam description Divisions's description.
 * @apiSuccess {Object} divisions Divisions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Divisions not found.
 */
router.post('/', token({ required: true }), body({ name, authorID, description }), create);

/**
 * @api {get} /divisions Retrieve divisions
 * @apiName RetrieveDivisions
 * @apiGroup Divisions
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of divisions.
 * @apiSuccess {Object[]} rows List of divisions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', token({ required: true }), query(), index);

/**
 * @api {get} /divisions/:id Retrieve divisions
 * @apiName RetrieveDivisions
 * @apiGroup Divisions
 * @apiSuccess {Object} divisions Divisions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Divisions not found.
 */
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /divisions/:id Update divisions
 * @apiName UpdateDivisions
 * @apiGroup Divisions
 * @apiParam name Divisions's name.
 * @apiParam createdBy Divisions's createdBy.
 * @apiParam createdDate Divisions's createdDate.
 * @apiParam description Divisions's description.
 * @apiSuccess {Object} divisions Divisions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Divisions not found.
 */
router.put('/:id', token({ required: true }), body({ name, authorID, description }), update);

/**
 * @api {delete} /divisions/:id Delete divisions
 * @apiName DeleteDivisions
 * @apiGroup Divisions
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Divisions not found.
 */
router.delete('/:id', token({ required: true }), destroy);

export default router;
