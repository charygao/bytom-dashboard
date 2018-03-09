const mappings = {
  id: 'ID',
  type: 'Type',
  purpose: 'Purpose',
  transactionId: 'Transaction ID',
  position: 'Position',
  assetId: 'Asset ID',
  assetAlias: 'Asset Alias',
  assetDefinition: 'Asset Definition',
  assetTags: 'Asset Tags',
  assetIsLocal: 'Asset Is Local?',
  amount: 'Amount',
  accountId: 'Account ID',
  accountAlias: 'Account Alias',
  accountTags: 'Account Tags',
  controlProgram: 'Control Program',
  programIndex: 'Program Index',
  spentOutputId: 'Spent Output ID',
  refData: 'Reference Data',
  sourceId: 'Source ID',
  sourcePos: 'Source Postion',
  issuanceProgram: 'Issuance Program',
  isLocal: 'Local?',
  referenceData: 'Reference Data',
}

const txInputFields = [
  'type',
  'assetId',
  'assetAlias',
  'assetDefinition',
  'assetTags',
  'assetIsLocal',
  'amount',
  'accountId',
  'accountAlias',
  'accountTags',
  'issuanceProgram',
  'spentOutputId',
  'isLocal',
  'referenceData',
]

const txOutputFields = [
  'type',
  'purpose',
  'id',
  'position',
  'assetId',
  'assetAlias',
  'assetDefinition',
  'assetTags',
  'assetIsLocal',
  'amount',
  'accountId',
  'accountAlias',
  'accountTags',
  'controlProgram',
  'isLocal',
  'referenceData',
]

const unspentFields = [
  'type',
  'purpose',
  'transactionId',
  'position',
  'assetId',
  'assetAlias',
  'assetDefinition',
  'assetTags',
  'assetIsLocal',
  'amount',
  'accountId',
  'accountAlias',
  'accountTags',
  'controlProgram',
  'programIndex',
  'refData',
  'sourceId',
  'sourcePos',
  'isLocal',
  'referenceData',
]

const balanceFields = Object.keys(mappings)

const buildDisplay = (item, fields) => {
  const details = []
  fields.forEach(key => {
    if (item.hasOwnProperty(key)) {
      details.push({label: mappings[key], value: item[key]})
    }
  })
  return details
}

const fomateDecimal = (src,pos) => {
  let srcString = src.toString()
  var rs = srcString.indexOf('.')
  if (rs < 0) {
    rs = srcString.length
    srcString += '.'
  }
  while (srcString.length <= rs + pos) {
    srcString += '0'
  }
  return srcString
}

const normalizeAmount = (assetAlias, amount, btmAmountUnit) => {
  //normalize BTM Amount
  if (assetAlias === 'btm') {
    switch (btmAmountUnit){
      case 'BTM':
        return fomateDecimal(amount/100000000, 8)
      case 'mBTM':
        return fomateDecimal(amount/100000, 5)
    }
  }
  return amount
}

export function buildTxInputDisplay(input) {
  return buildDisplay(input, txInputFields)
}

export function buildTxOutputDisplay(output) {
  return buildDisplay(output, txOutputFields)
}

export function buildUnspentDisplay(output, btmAmountUnit) {
  const normalized = {
    amount: normalizeAmount(output.assetAlias, output.amount, btmAmountUnit),
    accountId: output.accountId,
    accountAlias: output.accountAlias,
    assetId: output.assetId,
    assetAlias: output.assetAlias,
    controlProgram: output.program,
    programIndex: output.controlProgramIndex,
    refData: output.refData,
    sourceId: output.sourceId,
    sourcePos: output.sourcePos
  }
  return buildDisplay(normalized, unspentFields)
}

export function buildBalanceDisplay(balance, btmAmountUnit) {
  return buildDisplay({
    amount: normalizeAmount(balance.assetAlias, balance.amount, btmAmountUnit),
    assetId: balance.assetId,
    assetAlias: balance.assetAlias,
    accountAlias: balance.accountAlias
  }, balanceFields)
}
