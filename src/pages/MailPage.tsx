import React, { ChangeEvent, FormEvent, useState } from "react";

function MailPage() {
  const [mailingList, setMailingList] = useState<string[]>([]);
  const [enterdEmailAddress, setEnterdEmailAddress] = useState("");

  // 계산:
  const addContact = (emailList: string[], emailAddress: string) => [
    ...emailList,
    emailAddress,
  ];

  // 액션:
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMailingList = addContact(mailingList, enterdEmailAddress);
    setMailingList(newMailingList);
    setEnterdEmailAddress("");
  };
  // 액션:
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnterdEmailAddress(e.target.value);
  };

  return (
    <main>
      <ul>
        {mailingList.map((mailAddress) => (
          <li key={mailAddress}>{mailAddress}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          value={enterdEmailAddress}
          onChange={handleInputChange}
        />
        <input type="submit" value="추가" />
      </form>
    </main>
  );
}
export default MailPage;
