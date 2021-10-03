import { v4 } from 'uuid';
import docClient from '../..';
import { CASES, IRequestSubmissionEntity, RequestStatus } from "../../entities/RequestSubmissionEntity";
import { DateTime } from 'luxon';
import * as Yup from 'yup';

class RequestSubmissionService {
    private static tableName = 'HandleMyCaseDynamoTables-requestSubmissions307F0A30-1IC1PJSMU2YGA';

    public static async addNewRequestSubmission(
        newRequestSubmission: Omit<IRequestSubmissionEntity, 'id' | 'createdDate' | 'status'>
    ): Promise<IRequestSubmissionEntity> {
        const id = v4();
        const createdDate = DateTime.now().setZone('utc').toSeconds().toString();
        const result = await docClient.put({
            TableName: RequestSubmissionService.tableName,
            Item: {
                'id': id,
                'name': newRequestSubmission.name,
                'phoneNumber': newRequestSubmission.phoneNumber,
                'email': newRequestSubmission.email,
                'case': newRequestSubmission.case,
                'status': RequestStatus.OPEN,
                'createdDate': createdDate,
                'createdate#topic#accountId#userId': `${createdDate}#${newRequestSubmission.topic}#undefined#undefined`,
                'topic': newRequestSubmission.topic,
            }
        }).promise();

        if (result.$response.error) throw Error(result.$response.error.message);

        return {
            ...newRequestSubmission,
            id,
            createdDate,
            status: RequestStatus.OPEN,
        }
    }

    public static async getAllRequests(): Promise<IRequestSubmissionEntity[]> {

        const previousThirtyDays = DateTime.now().minus({ days: 30 }).setZone('utc').toSeconds().toString();

        const results = await docClient.query({
            TableName: RequestSubmissionService.tableName,
            IndexName: 'gsiStatusCreatedDateTopicAccountUserId',
            KeyConditionExpression: '#status= :status and #gsiSort >= :createdDate',
            ExpressionAttributeNames: {
                '#status': 'status',
                '#gsiSort': 'createdate#topic#accountId#userId',
            },
            ExpressionAttributeValues: {
                ':status': 'OPEN',
                ':createdDate': previousThirtyDays,
            }
        }).promise();

        if (results.$response.error) {
            throw Error(results.$response.error.message);
        }

        return results.Items as IRequestSubmissionEntity[]
    }

    public static schema = Yup.object().shape({
        name: Yup.string()
            .max(60, '')
            .required('This field is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('This field is required'),
        phoneNumber: Yup.string()
            .matches(new RegExp('^[0-9]*$'), 'Phone number should be only numbers')
            .min(10, 'Phone number should be 10 digits')
            .max(10, 'Phone number should be 10 digits')
            .required('Phone number is a required field'),
        topic: Yup.mixed<CASES>().oneOf(Object.values(CASES), 'Invalid topic selected from dropdown'),
        case: Yup.string().required('This field is required'),
    });
}

export default RequestSubmissionService;
