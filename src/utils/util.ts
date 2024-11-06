export const randomNumber = (length: number) => {
  let text = "";
  const possible = "123456789";
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup === i ? "0" : possible.charAt(sup);
  }
  return Number(text);
}
export const getDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
}

export const formartPhone = ({ phone, country }: { phone: string, country: string }) => {
  let formartedPhone

  switch (country) {
    case "NGN":
      if (parseInt(phone.charAt(0)) > 0) {
        formartedPhone = `234${phone}`;
      } else {
        formartedPhone = phone.replace(/^0+/, "234");
      }
      break;

    default:
      if (parseInt(phone.charAt(0)) > 0) {
        formartedPhone = `234${phone}`;
      } else {
        formartedPhone = phone.replace(/^0+/, "234");
      }
      break;
  }
  return formartedPhone
}

