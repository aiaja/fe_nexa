"use client"
import DeliveryHistoryPage from '@/features/manager/(maps-routes)/history/history-data'
import { deliveryHistory } from '@/data/manager/delivery-history'

function page() {
  return (
    <div><DeliveryHistoryPage historyItems={deliveryHistory}/></div>
  )
}

export default page
