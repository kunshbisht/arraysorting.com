// Obtén referencias a los elementos HTML
const canvas = document.getElementById("canvas");
const messageDiv = document.getElementById("message");
const numElInput = document.getElementById("numEl");
const updateButton = document.getElementById("updateButton");

function generateRandomArray(numEl) {
    const num = Array.from({ length: numEl }, (_, i) => i);
    const arr = [];

    while (num.length > 0) {
        const currentnum = Math.floor(Math.random() * num.length);
        arr.push(num[currentnum]);
        num.splice(currentnum, 1);
    }

    return arr;
}

function createRectangles(arr, width) {
    canvas.innerHTML = "";

    arr.forEach((val, i) => {
        const x = width * i;
        const height = (val / arr.length) * canvas.getAttribute("height");
        const color = `hsl(${(360 * val) / arr.length}, 100%, 50%)`;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", canvas.getAttribute("height") - height);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", color);

        canvas.appendChild(rect);
    });
}

function swapColumns(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function updateCanvas() {
    const numEl = parseInt(numElInput.value);
    const canvasWidth = 800; // Ancho máximo del canvas
    const width = canvasWidth / numEl;
    const randomArray = generateRandomArray(numEl);
    createRectangles(randomArray, width);

    const startTime = Date.now();
    const totalTime = 100; // Tiempo total deseado en milisegundos

    function step() {
        let currentIndex = 0;

        while (currentIndex >= 0 && currentIndex < randomArray.length - 1) {
            const leftIndex = currentIndex;
            const rightIndex = currentIndex + 1;

            if (randomArray[leftIndex] > randomArray[rightIndex]) {
                swapColumns(randomArray, leftIndex, rightIndex);
                createRectangles(randomArray, width);
            }
            currentIndex++;
        }

        if (!isSorted(randomArray)) {
            // Continúa con el siguiente paso después de 1 ms
            setTimeout(step, 1);
        } else {
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            if (elapsedTime < totalTime) {
                // Aún no se ha alcanzado el tiempo total deseado, continúa ordenando
                setTimeout(step, 1);
            } else {
                messageDiv.innerText = "¡Listo!";
            }
        }
    }

    // Comienza el proceso de ordenación
    setTimeout(step, 1);
}

// Agrega un evento click al botón de actualizar
updateButton.addEventListener("click", updateCanvas);

// Inicializa el canvas con los valores por defecto
updateCanvas();
