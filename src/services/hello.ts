import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {S3Client,ListBucketsCommand} from '@aws-sdk/client-s3' 

// Note a good practice when using awssdk -make sure to initilize the client outside the handler function 
// this allow aws lambda to resuse this client 
// bacuase somtimes this is an intensive operation and we want only do it ones if possible
const s3Client = new S3Client({});

async function handler (event:APIGatewayProxyEvent, context: Context){

    // This command will not work unless the correct IAM policy is configured.
    //update this lambda in infra/lambdastack to have right to senthis list bucket command
    const command = new ListBucketsCommand({});
    const listBucketsResult = (await s3Client.send(command)).Buckets;

    const response: APIGatewayProxyResult = {
        statusCode:200,
        body:JSON.stringify('Hello from Lambda!, here are your buckets:'+ JSON.stringify(listBucketsResult))
    }
    console.log(event);
    return response;
}

export {handler}