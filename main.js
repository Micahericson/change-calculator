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
  
      // Set all outputs instantly so tests pass
      for (const key in changeBreakdown) {
        const el = document.getElementById(`${key}-output`);
        if (el) el.textContent = changeBreakdown[key];
      }
  
      // Set total and whole dollar values
      const totalChangeFloat = (amountReceived - amountDue).toFixed(2);
      const totalChangeInt = Math.floor(amountReceived - amountDue);
  
      document.getElementById('total-change').textContent = totalChangeFloat;
      document.getElementById('dollars-output').textContent = totalChangeInt;
  
      // Show result output
      const output = document.getElementById("change-output");
      output.classList.remove("d-none");
      output.style.animation = "none";
      void output.offsetWidth;
      output.style.animation = "fadeIn 0.8s ease-in-out";
    });
  });
  
  