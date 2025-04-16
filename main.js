// Animate total change increment
function animateChangeAmount(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentAmount = start + (end - start) * progress;

    element.textContent = currentAmount.toFixed(2);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculate-change").addEventListener("click", () => {
    const amountDue = parseFloat(document.getElementById('amount-due').value);
    const amountReceived = parseFloat(document.getElementById('amount-received').value);

    if (isNaN(amountDue) || isNaN(amountReceived) || amountReceived < amountDue) {
      alert("Please enter valid amounts. Amount received must be greater than or equal to amount due.");
      return;
    }

    let changeInCents = Math.round((amountReceived - amountDue) * 100);

    const denominations = {
      twenties: 2000,
      tens: 1000,
      fives: 500,
      twos: 200,
      ones: 100,
      quarters: 25,
      dimes: 10,
      nickels: 5,
      pennies: 1
    };

    const changeBreakdown = {};

    for (const [name, value] of Object.entries(denominations)) {
      changeBreakdown[name] = Math.floor(changeInCents / value);
      changeInCents %= value;
    }

    // Set individual outputs
    for (const key in changeBreakdown) {
      const el = document.getElementById(`${key}-output`);
      if (el) el.textContent = changeBreakdown[key];
    }

    // Animate total change due
    const totalChangeFloat = parseFloat((amountReceived - amountDue).toFixed(2));
    const currentDisplay = parseFloat(document.getElementById('total-change').textContent) || 0;

    if (totalChangeFloat > 0) {
      animateChangeAmount(
        document.getElementById('total-change'),
        currentDisplay,
        totalChangeFloat,
        800
      );
    } else {
      document.getElementById('total-change').textContent = "0.00";
    }

    // Whole dollars output
    const totalChangeInt = Math.floor(amountReceived - amountDue);
    document.getElementById('dollars-output').textContent = totalChangeInt;

    // Show result output with animation
    const output = document.getElementById("change-output");
    output.classList.remove("d-none");
    output.style.animation = "none";
    void output.offsetWidth;
    output.style.animation = "fadeIn 0.8s ease-in-out";
  });
});

  