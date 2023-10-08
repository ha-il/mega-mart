import React, { useEffect, useState } from "react";

interface Subscriber {
  email: string;
  rec_count: number;
}

interface Coupon {
  code: string;
  rank: "best" | "good" | "bad";
}

interface Message {
  from: string;
  to: string;
  subject: string;
  body: string;
}

function CouponPage() {
  // 마케팅팀: 친구 10명을 추천한 고객에게 이메일로 "best" 쿠폰을 보내주려고 해요. 금요일까지 가능할까요?

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 1. 데이터베이스에서 구독자 목록 가져오기: 액션
    const getSubscribers = async () => {
      const response = await fetch("http://localhost:5000/emails");
      const data = await response.json();
      return data;
    };

    // 2. 데이터베이스에서 쿠폰 목록 가져오기: 액션
    const getCoupons = async () => {
      const response = await fetch("http://localhost:5000/coupons");
      const data = await response.json();
      return data;
    };

    // 3. 보내야 할 이메일 목록 만들기
    // 3.1 쿠폰 등급 결정하기: 계산
    const subCouponRank = (subscriber: Subscriber) =>
      subscriber.rec_count >= 10 ? "best" : "good";

    // 3.2 특정 등급 쿠폰 목록 선택하기: 계산
    const selectCouponByRank = (
      couponlist: Coupon[],
      rank: "best" | "good",
    ) => {
      const selectedCoupons = couponlist.filter(
        (coupon) => coupon.rank === rank,
      );
      return selectedCoupons;
    };

    // 3.3 이메일 만들기: 계산
    const emailForSubscirber = (
      subscriber: Subscriber,
      goods: Coupon[],
      bests: Coupon[],
    ) => {
      const rank = subCouponRank(subscriber);

      if (rank === "best")
        return {
          from: "megamart@mega.com",
          to: subscriber.email,
          subject: "주간 베스트 쿠폰 목록입니다!",
          body: goods.map((good) => good.code).join(", "),
        };
      return {
        from: "megamart@mega.com",
        to: subscriber.email,
        subject: "주간 추천 쿠폰 목록입니다!",
        body: bests.map((best) => best.code).join(", "),
      };
    };

    // 3.4 이메일 목록 만들기: 계산
    const emailForSubscirbers = (
      subscribers: Subscriber[],
      goods: Coupon[],
      bests: Coupon[],
    ) => {
      const emails = subscribers.map((subscriber) =>
        emailForSubscirber(subscriber, goods, bests),
      );
      return emails;
    };
    // 4. 이메일 보내기: 액션
    const sendIssue = async () => {
      const coupons = await getCoupons();
      const goodCoupons = selectCouponByRank(coupons, "good");
      const bestCoupons = selectCouponByRank(coupons, "best");
      const subscribers = await getSubscribers();
      const emails = emailForSubscirbers(subscribers, goodCoupons, bestCoupons);
      setMessages(emails);
    };
    sendIssue();
  }, []);

  return (
    <ul>
      {messages.map(({ subject, from, to, body }) => (
        <li>
          <h2>{subject}</h2>
          <div>보냄: {from}</div>
          <div>받음: {to}</div>
          <p>{body}</p>
        </li>
      ))}
    </ul>
  );
}
export default CouponPage;
