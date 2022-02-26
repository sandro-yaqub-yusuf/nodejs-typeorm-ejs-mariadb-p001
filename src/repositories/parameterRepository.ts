import { EntityRepository, Repository } from 'typeorm';
import Parameter from '../models/Parameter';

@EntityRepository(Parameter)
export default class parameterRepository extends Repository<Parameter> {}
