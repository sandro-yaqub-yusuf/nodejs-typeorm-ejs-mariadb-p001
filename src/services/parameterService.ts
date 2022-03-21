import { dataSource } from '../database';
import Parameter from '../models/Parameter';

interface IParameterInstance {
    id: number;
    attribute: string;
    value: string;
}

const parameterRepository = dataSource.getRepository(Parameter);

class ParameterService {
    public async getAll(): Promise<Parameter[]> {
        return await parameterRepository.find();
    }

    public async getById(id: number): Promise<Parameter | null> {
        return await parameterRepository.findOneBy({ id });
    }

    public async getByAttribute(attribute: string): Promise<Parameter | null> {
        return await parameterRepository.findOneBy({ attribute });
    }

    public async update(parameterData: IParameterInstance): Promise<Parameter> {
        const parameter = await parameterRepository.findOneBy({ id: parameterData.id });

        if (!parameter) throw new Error('Parâmetro não encontrado !');
        
        parameter.value = parameterData.value;

        const parameterUpdate = await parameterRepository.save(parameter);

        if (!parameterUpdate) throw new Error('Não foi possível alterar o Parâmetro !');

        return parameterUpdate;
    }
}

export default new ParameterService();
