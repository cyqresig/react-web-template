/**
 * @fileoverview node env
 * @since 2017-04-04 15:46
 * @author chenyiqin
 */

import * as nodeEnvType from './node-env-type'

export default process.env.NODE_ENV || nodeEnvType.PRODUCTION
