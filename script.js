let isFunctionEnabled = true;
const button = document.getElementsByTagName('button')[0];

const fetchData = async () => {
    return fetch('https://api.adviceslip.com/advice')
        .then((response) => {
            if (!response.ok) {
                console.error('Response was not ok, status:', response.status);
            }

            return response.json()
        })
        .catch(error => {
            console.error('Error in fetching data:', error);
        });
}

const getNewAdvice = async () => {
    if (isFunctionEnabled) {

        isFunctionEnabled = false;
        button.disabled = true;

        try {
            const data = await fetchData();

            document.getElementsByTagName('q')[0].innerHTML = data.slip.advice;

            document.getElementById('number').innerHTML = data.slip.id;
        } catch (error) {
            console.error('Something wrong went with fetching new advice', error)
        }

        setTimeout(() => {
            isFunctionEnabled = true;
            button.disabled = false;
        }, 2000);
    }
}

getNewAdvice()