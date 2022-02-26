import { getCustomRepository } from 'typeorm';
import Parameter from '../models/Parameter';
import ParameterRepository from '../repositories/parameterRepository';

interface IParameterInstance {
    id: number;
    attribute: string;
    value: string;
}

class ParameterService {
    public async getAll(): Promise<Parameter[]> {
        const parameterRepository = getCustomRepository(ParameterRepository);

        const parameters = await parameterRepository.find();

        return parameters;
    }

    public async getById(id: number): Promise<Parameter | undefined> {
        const parameterRepository = getCustomRepository(ParameterRepository);

        const parameter = await parameterRepository.findOne(id);

        if (!parameter) throw new Error('Parâmetro não encontrado !');

        return parameter;
    }

    public async getByAttribute(attribute: string): Promise<Parameter | undefined> {
        const parameterRepository = getCustomRepository(ParameterRepository);

        const parameter = await parameterRepository.findOne(attribute);

        if (!parameter) throw new Error('Parâmetro não encontrado !');

        return parameter;
    }

    public async update(parameterData: IParameterInstance): Promise<Parameter | unknown> {
        const parameterRepository = getCustomRepository(ParameterRepository);

        const parameter = await parameterRepository.findOne(parameterData.id);

        if (!parameter) throw new Error('Parâmetro não encontrado !');
        
        parameter.value = parameterData.value;

        const parameterUpdate = await parameterRepository.save(parameter);

        if (!parameterUpdate) throw new Error('Não foi possível alterar o Parâmetro !');

        return parameterUpdate;
    }
}

export default new ParameterService();
