import { v4 as uuidv4 } from 'uuid';
import docClient from '../..';
import User from '../../models/User';

export interface IUserService {
    addUser: (user: User) => Promise<User>,
    getAllUsers: () => Promise<User[]>,
    getUser: (id: string) => Promise<User | undefined>,
    // updateUser: () => User,
    // removeUser: () => void,
}

class UserService {
    private static tableName = 'HandleMyCaseDynamoTables-userProfiles870EDB81-VFZOMKP9623E';

    public static getUser = async (id: string): Promise<User | undefined> => {
      const result = await docClient.get({
        TableName: UserService.tableName,
        Key: {
          id: { S: id },
        },
      }).promise();

      if (result.$response.error) {
        throw Error(result.$response.error.message);
      }

      return result.Item as User | undefined;
    }

    public static getAllUsers = async (): Promise<User[]> => {
      const result = await docClient.query({
        TableName: UserService.tableName,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
          '#id': 'id',
        },
        ExpressionAttributeValues: {
          ':id': '1'
        },
      }).promise();

      if (!result.Items?.length) {
        throw Error('There was an issue retrieving your users');
      }

      return result.Items as User[];
    };

    public static addUser = async (user: User): Promise<User> => {
      const userId = uuidv4();
      const result = await docClient.put({
        TableName: UserService.tableName,
        Item: {
          id: { S: userId },
          accountId: { S: '1' },
        },
      }).promise();

      if (result.$response.error) {
        throw Error(result.$response.error.message);
      }

      return { ...user, id: userId };
    };

  // public updateUser = () => User;

  // public removeUser = () => { };
}

export default UserService;
