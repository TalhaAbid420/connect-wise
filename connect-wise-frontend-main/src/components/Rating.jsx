function Rating({ value }) {
  return (
    <div className="flex items-center gap-0.5 text-primary">
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.floor(value);
        const halfFilled =
          value % 1 !== 0 && index === Math.floor(value) && value % 1 >= 0.5;
        return halfFilled ? (
          <HalfFilledStarIcon key={index} />
        ) : (
          <StarIcon key={index} filled={filled} />
        );
      })}
    </div>
  );
}

export default Rating;

function StarIcon({ filled = true, ...props }) {
  return (
    <svg
      {...props}
      className="h-4 w-4 text-yellow-500 dark:text-yellow-400"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

function HalfFilledStarIcon(props) {
  return (
    <svg
      {...props}
      className="h-[0.9rem] w-[0.9rem] text-yellow-500 dark:text-yellow-400"
      fill={'currentColor'}
      viewBox="0 0 536 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m508.55 171.51-146.37-21.31-65.41-132.39c-5.88-11.83-17.35-17.81-28.82-17.81-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48c-3.56 20.78 13.03 37.45 31.61 37.45 4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63z" />
    </svg>
  );
}
