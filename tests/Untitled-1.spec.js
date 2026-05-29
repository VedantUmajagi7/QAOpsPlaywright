// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const user = {
  email: 'umajagiv91@gmail.com',
  password: 'Ved@9890',
  fullName: 'Vedant Umajagi',
  phone: '9876543210',
};

// ---------- Helper Functions ----------

/**
 * @param {import('@playwright/test').Page} page
 */
async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  await page
    .getByPlaceholder('you@email.com')
    .fill(user.email);

  await page
    .getByLabel('Password')
    .fill(user.password);

  await page.locator('#login-btn').click();

  expect(page.locator("#nav-events")).toBeVisible();
}

// Generate Future Date
function futureDateValue(days = 5) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 16);
}

// Extract Seat Count
/**
 * @param {import('@playwright/test').Locator} card
 */
async function getSeatCount(card) {
  const seatText = await card
    .locator('text=/seat/i')
    .innerText();

  return Number(seatText.match(/\d+/)?.[0]);
}

// ---------- Test ----------

test.describe('Event Booking Flow', () => {

  test('Create event, complete booking and verify seat reduction', async ({
    page,
  }) => {

    // Step 1 — Login
    await login(page);

    // Step 2 — Create Event
    await page.goto(`${BASE_URL}/admin/events`);

    const eventTitle = `Test Event ${Date.now()}`;

    await page
      .locator('#event-title-input')
      .fill(eventTitle);

    await page
      .locator('#admin-event-form textarea')
      .fill('Automation Event Description');

    await page.getByLabel('City').fill('Pune');

    await page.getByLabel('Venue').fill('Phoenix Mall');

    await page
      .getByLabel('Event Date & Time')
      .fill(futureDateValue());

    await page
      .getByLabel('Price ($)')
      .fill('100');

    await page
      .getByLabel('Total Seats')
      .fill('50');

    await page.locator('#add-event-btn').click();

    // Verify Toast
    await expect(
      page.getByText('Event created!')
    ).toBeVisible();

    // Step 3 — Find Event Card
    await page.goto(`${BASE_URL}/events`);

    const eventCards =
      page.getByTestId('event-card');

    await expect(
      eventCards.first()
    ).toBeVisible();

    const matchedCard = eventCards.filter({
      hasText: eventTitle,
    });

    await expect(matchedCard).toBeVisible({
      timeout: 5000,
    });

    // Capture Seats Before Booking
    const seatsBeforeBooking =
      await getSeatCount(matchedCard);

    console.log(
      `Seats Before Booking: ${seatsBeforeBooking}`
    );

    // Step 4 — Start Booking
    await matchedCard
      .getByTestId('book-now-btn')
      .click();

    // Step 5 — Fill Booking Form
    await expect(
      page.locator('#ticket-count')
    ).toHaveText('1');

    await page
      .getByLabel('Full Name')
      .fill(user.fullName);

    await page
      .locator('#customer-email')
      .fill(user.email);

    await page
      .getByPlaceholder('+91 98765 43210')
      .fill(user.phone);

    await page
      .locator('.confirm-booking-btn')
      .click();

    // Step 6 — Verify Booking Confirmation
    const bookingReference = page
      .locator('.booking-ref')
      .first();

    await expect(
      bookingReference
    ).toBeVisible();

    const bookingRef = (
      await bookingReference.innerText()
    ).trim();

    console.log(
      `Booking Reference: ${bookingRef}`
    );

    // Step 7 — Verify My Bookings
    await page
      .getByText('View My Bookings')
      .click();

    await expect(page).toHaveURL(
      `${BASE_URL}/bookings`
    );

    const bookingCards =
      page.locator('#booking-card');

    await expect(
      bookingCards.first()
    ).toBeVisible();

    const matchedBookingCard =
      bookingCards.filter({
        has: page.locator('.booking-ref', {
          hasText: bookingRef,
        }),
      });

    await expect(
      matchedBookingCard
    ).toBeVisible();

    await expect(
      matchedBookingCard
    ).toContainText(eventTitle);

    // Step 8 — Verify Seat Reduction
    await page.goto(`${BASE_URL}/events`);

    await expect(
      eventCards.first()
    ).toBeVisible();

    const updatedCard = eventCards.filter({
      hasText: eventTitle,
    });

    await expect(updatedCard).toBeVisible();

    const seatsAfterBooking =
      await getSeatCount(updatedCard);

    console.log(
      `Seats After Booking: ${seatsAfterBooking}`
    );

    // Final Assertion
    expect(seatsAfterBooking).toBe(
      seatsBeforeBooking - 1
    );
  });
});

