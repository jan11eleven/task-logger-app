export default function calculateAge(birthdate: Date): number {
  const today = new Date();
  const birthdateYear = birthdate.getFullYear();
  const birthdateMonth = birthdate.getMonth();
  const birthdateDay = birthdate.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let age = currentYear - birthdateYear;

  // Check if birthday hasn't occurred yet this year
  if (
    currentMonth < birthdateMonth ||
    (currentMonth === birthdateMonth && currentDay < birthdateDay)
  ) {
    age--;
  }

  return age;
}
