const prices = {
  "蜀香麻辣": 130,
  "石頭火鍋": 130,
  "田園蕃茄": 130,
  "濃郁牛奶": 130,
  "烏溜溜黑蒜": 130,
  "酸菜魚": 130
};

let order = {
  item: "",
  cheese: false,
  total: 0
};

function chooseItem(name) {
  order.item = name;
  order.total = prices[name];

  let cheese = confirm("需要加起司嗎？+10元");

  if (cheese) {
    order.cheese = true;
    order.total += 10;
  }

  alert(
    "已加入訂單\n\n" +
    order.item +
    "\n金額：" +
    order.total +
    "元"
  );
}
