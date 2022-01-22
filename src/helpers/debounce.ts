const debounce = (func, delay) => {
  let timer;

  return function () {
    // let self = this;
    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(
      (context) => {
        func.apply(context, args);
      },
      delay,
      this,
    );
  };
};

export default debounce;
