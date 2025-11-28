const choices = document.querySelectorAll(".buttons");
const newMsg = document.querySelector("#msg");
const userScoreNum = document.querySelector("#user-score");
const compScoreNum = document.querySelector("#ai-score");

choices.forEach((button) => {
    button.onclick = async () => {
        const userChoice = button.getAttribute("id");
        const response = await fetch("http://localhost:8080/play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMove: userChoice }),
        });

        const data = await response.json();
        updateUI(data);
    };
});

function updateUI(data) {
    const { result, compMove, userScore, aiScore, finalResult } = data;

    newMsg.innerText = `AI chose ${compMove}. ${result === 'draw' ? "It's a draw!" : result === 'user' ? 'You win!' : 'You lose!'}`;
    if (userScore !== undefined && aiScore !== undefined) {
        userScoreNum.innerText = userScore;
        compScoreNum.innerText = aiScore;
    }

    if (finalResult) {
        alert(finalResult === 'win' ? "🎉 You won the game!" : "😞 AI won the game.");
        userScoreNum.innerText = "0";
        compScoreNum.innerText = "0";
    }
}
