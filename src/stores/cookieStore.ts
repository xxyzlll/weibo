import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCookieStore = defineStore('cookie', () => {
  const cookie = ref('SINAGLOBAL=785798188125.4927.1714198709262; SCF=AjPHCq7edQy4TxJjInMIB8yC1wtaOQ6MLFHhJ2JG2Iy16t5d4mIfbCm318L3gOhdoo0mThcMnFAdJOezavqFWRA.; SUB=_2A25FNHb7DeRhGeFH6FIW8S7JzT6IHXVmSPYzrDV8PUNbmtAbLUjckW9Ne2j0mQuwYj2GfwTawDCUhyWHttJLlCfp; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWhsk7jkywpWnMqbn90zFaG5JpX5KzhUgL.FoM4e05NeK5fSoz2dJLoI0qLxK-L1-zLBo5LxK-L1hnLBo5LxKqL1K.L1K-LxKnLB.qL1hMLxK-L12-LB.zLxKBLB.2L1hqt; ALF=02_1750569900; XSRF-TOKEN=Eqq3k3j7SQGJpWigvOQT1kvp; WBPSESS=rISvH9geIeZF9eDvFdkIfsC9mP0qXWEt4nOYfjIH4LzkQE_b4U2TLW2r_usMCRyeZCTeoUEzY--aOa9INokHfyCQYi7qSXte8BORSh6bBzRd-xC6rn1AKT8-Ym9y3b1Ag6MURLX1TfBQ_z07txx7YA==; _s_tentry=-; Apache=3025091587979.1494.1748253400495; ULV=1748253400508:16:1:1:3025091587979.1494.1748253400495:1739260323440')

  function setCookie(value: string) {
    cookie.value = value
  }

  return {
    cookie,
    setCookie
  }
})