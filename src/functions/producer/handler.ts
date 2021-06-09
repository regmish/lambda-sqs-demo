import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const main: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('Incoming data');
  return formatJSONResponse({
    event,
  });
}

export default middyfy(main);
