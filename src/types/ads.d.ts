/** 광고 객체 타입 */
export interface Ad {
  id: number
  advertiserId: number
  title: string
  adType: string
  imageUrl: string
  targetUrl: string
  preferredPosition: string
  startAt: string
  endAt: string
  billingType: string
  budget: number
  spentAmount: number
  status: string
  score: number
  targetSegment: string | null
}
