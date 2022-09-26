import React, { useEffect, useState } from 'react'

import Wallet from 'qp-walletprovider'

const App = () => {
  const [address, setAddress] = useState("")

  let wallet = new Wallet();

  const connectToWallet = () => {
    wallet.connect().then((res) => {
      setAddress(res)
    })
  }

  return (
    <React.Fragment>
      {address === "" ?
        (
          <button onClick={() => connectToWallet()}>
            Connect
          </button>
        ) : (
          <>
            Address : {address}
          </>
        )}

    </React.Fragment>
  )
}

export default App
