let display = document.getElementById('display');
let clearBtn = document.getElementById('clear');
let backspaceBtn = document.getElementById('backspace');
let divideBtn = document.getElementById('divide');
let multiplyBtn = document.getElementById('multiply');
let subtractBtn = document.getElementById('subtract');
let addBtn = document.getElementById('add');
let equalsBtn = document.getElementById('equals');
let numberBtns = document.querySelectorAll('button:not([id^="clear"], [id^="backspace"], [id^="divide"], [id^="multiply"], [id^="subtract"], [id^="add"], [id^="equals"])');

clearBtn.addEventListener('click', function() {
  display.value = '';
});

backspaceBtn.addEventListener('click', function() {
  display.value = display.value.slice(0, -1);
});

divideBtn.addEventListener('click', function() {
  display.value += '/';
});

multiplyBtn.addEventListener('click', function() {
  display.value += '*';
});

subtractBtn.addEventListener('click', function() {
  display.value += '-';
});

addBtn.addEventListener('click', function() {
  display.value += '+';
});

equalsBtn.addEventListener('click', function() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = 'Error';
  }
});

numberBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    display.value += btn.textContent;
  });
});