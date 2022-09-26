import React from 'react'
import { useRouter } from 'next/router'
import AddParty from '.'

const UpdateParty = () => {
  const router = useRouter()
  const upPartyId = router.query.partyid;

  return (
    <AddParty updateId={upPartyId}/>
  )
}

export default UpdateParty