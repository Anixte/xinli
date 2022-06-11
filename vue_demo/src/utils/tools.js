// 处理天气图标

export const weaIcon = function (wea) {
  switch (wea) {
    case "小雨":
      return "mdi-weather-rainy";
    case "中雨":
      return "mdi-weather-pouring";
    case "大雨":
      return "mdi-weather-pouring";
    case "中到大雨":
      return "mdi-weather-pouring";
    case "小到中雨":
      return "mdi-weather-rainy";
    case "雷阵雨":
      return "mdi-weather-lightning-rainy";
    case "阵雨":
      return "mdi-weather-partly-rainy";
    case "多云":
      return "mdi-weather-partly-cloudy";
    case "晴朗":
      return "mdi-white-balance-sunny";
    case "阴":
      return "mdi-weather-cloudy";
  }
};

// 获取当前日期的星期
export const weekDay = function (time) {
  const weekNum = new Date(time).getDay();
  const week = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return week[weekNum] ? week[weekNum] : "日期错误";
};

// 将当前日期返回简短版
export const shortWeekDay = function (time) {
  const weekNum = new Date(time).getDay();
  const week = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  return week[weekNum] ? week[weekNum] : "日期错误";
};
