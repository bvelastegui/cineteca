const loader = document.querySelector('#overlay');

export const ui = {
  toggleLoader: (show) => {
    if (show) {
      loader.classList.remove('d-none');
    } else {
      loader.classList.add('d-none');
    }
  },
};