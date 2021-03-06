const config = require('config')
const AWS = require('aws-sdk')
const elasticsearch = require('@elastic/elasticsearch')

AWS.config.region = config.AWS_REGION

// Elasticsearch client
let esClient

/**
 * Get ES Client
 * @return {Object} Elasticsearch Client Instance
 */
function getESClient () {
  if (esClient) {
    return esClient
  }
  const host = config.ES.HOST
  const cloudId = config.ES.ELASTICCLOUD.id
  if (!esClient) {
    if (cloudId) {
      // Elastic Cloud configuration
      esClient = new elasticsearch.Client({
        cloud: {
          id: cloudId
        },
        auth: {
          username: config.ES.ELASTICCLOUD.username,
          password: config.ES.ELASTICCLOUD.password
        }
      })
    } else {
      esClient = new elasticsearch.Client({
        node: host
      })
    }
  }
  return esClient
}

module.exports = {
  getESClient
}
