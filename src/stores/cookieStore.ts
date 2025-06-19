import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCookieStore = defineStore('cookie', () => {
  const cookie = ref('SCF=AjPHCq7edQy4TxJjInMIB8yC1wtaOQ6MLFHhJ2JG2Iy16t5d4mIfbCm318L3gOhdoo0mThcMnFAdJOezavqFWRA.; ULV=1748253400508:16:1:1:3025091587979.1494.1748253400495:1739260323440; XSRF-TOKEN=twSfbWmgZTunpa4vF39yED8L; SUB=_2A25FV77fDeRhGeFH7VMZ8ivIzjqIHXVmLL4XrDV8PUNbmtAbLUnlkW9Nesa2OgFwVSyZBRYYB1PZFoQJW9yWriaT; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWD7GTxnvv6vpzJxELE2re55JpX5KzhUgL.FoM4So2Reo-XSKq2dJLoI0YLxK-L12qLB-qLxKBLBo.L1K5LxKqL1h5L12-LxKBLBo.L1hnLxK-L1KqL1-BLxK-LB--L12eLxK-L1K-LBKqt; ALF=02_1752914832; WBPSESS=Dt2hbAUaXfkVprjyrAZT_B1iSgYI0XccwCIrCqZwvcRfVcL6J2z7Ai5WX5JLMDf8QFw9TsFuW6N1DZbCebGq6UIaU8_qWh3unHPcncDFtEInhYAZROCcNWgQcdJdCuIdH_ljeuMEdSkj0D-NdoFTvxDMalIQv4yNwRfm1XqxfRqPZroY21zJwCVWD3k7v4GoleAVAMPKg1wO-G2m8BInJA==')
  function setCookie(value: string) {
    cookie.value = value
  }

  return {
    cookie,
    setCookie
  }
})