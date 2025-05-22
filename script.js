document.addEventListener("DOMContentLoaded", () => {
  const editableCells = document.querySelectorAll(".editable");
  const resetButton = document.getElementById("resetButton");
  const modal = document.getElementById("congratulationsModal");
  const closeModal = document.querySelector(".close");
  const restartModalButton = document.getElementById("restartModalButton");
  const confettiContainers = document.querySelectorAll(".confetti-container");
  let confettiTriggered = false;

  // Load saved data from localStorage and check status
  editableCells.forEach((cell) => {
    const savedContent = localStorage.getItem(cellId(cell));
    if (savedContent) {
      cell.textContent = savedContent;
    }

    // Save data to localStorage on edit and update status
    cell.addEventListener("input", () => {
      localStorage.setItem(cellId(cell), cell.textContent);
      updateStatus(cell.parentElement);
      checkAllCompleted();
    });

    // Initial status check
    updateStatus(cell.parentElement);
  });

  // Generate a unique ID for each cell based on its position
  function cellId(cell) {
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    return `cell-${row}-${col}`;
  }

  // Update status based on cell content
  function updateStatus(row) {
    const realFoyda = row.cells[5].textContent.trim();
    const para = row.cells[4].textContent.trim();
    const sana = row.cells[6].textContent.trim();
    const statusCell = row.cells[7];

    if (realFoyda && para && sana) {
      statusCell.textContent = "Completed";
      statusCell.className = "status completed";
    } else {
      statusCell.textContent = "Pending";
      statusCell.className = "status pending";
    }
  }

  // Check if all rows are completed
  function checkAllCompleted() {
    const rows = document.querySelectorAll("#planTable tbody tr");
    const allCompleted = Array.from(rows).every(
      (row) => row.cells[7].textContent === "Completed"
    );

    if (allCompleted && !confettiTriggered) {
      modal.style.display = "flex";
      startConfetti();
      confettiTriggered = true; // Prevent multiple triggers
    } else if (!allCompleted) {
      modal.style.display = "none";
      stopConfetti();
      confettiTriggered = false;
    }
  }

  // Reset button functionality
  resetButton.addEventListener("click", () => {
    editableCells.forEach((cell) => {
      cell.textContent = "";
      localStorage.removeItem(cellId(cell));
      updateStatus(cell.parentElement);
    });
    checkAllCompleted();
    modal.style.display = "none";
    confettiTriggered = false; // Reset confetti trigger
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    stopConfetti(); // Stop confetti when closing modal
    confettiTriggered = false; // Reset confetti trigger to allow future triggers
  });

  // Restart from modal
  restartModalButton.addEventListener("click", () => {
    editableCells.forEach((cell) => {
      cell.textContent = "";
      localStorage.removeItem(cellId(cell));
      updateStatus(cell.parentElement);
    });
    checkAllCompleted();
    modal.style.display = "none";
    confettiTriggered = false; // Reset confetti trigger
  });

  // Start confetti animation from top
  function startConfetti() {
    const container = document.querySelector(".confetti-container.top");
    for (let i = 0; i < 100; i++) {
      // Konfetti sonini 100 ga oshirdim
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "0";
      confetti.style.animationDelay = Math.random() * 1 + "s";
      // Tasodifiy yon tomonga siljish uchun CSS o'zgaruvchisi
      confetti.style.setProperty("--random-x", Math.random() * 2 - 1); // -1 dan 1 gacha tasodifiy qiymat
      container.appendChild(confetti);
    }
  }

  // Stop confetti animation
  function stopConfetti() {
    const container = document.querySelector(".confetti-container.top");
    container.innerHTML = "";
  }

  // Initial check for all completed
  checkAllCompleted();
});
