import {test, expect, chromium} from '@playwright/test';

test.setTimeout(180000)

test('Test Case 6: Contact Us Form', async ({page}) => {
  //Open AutomationExercise page
  await page.goto('http://automationexercise.com/');
  //Check that "Contact Us" button is visible
  const contactUsButton = await page.$("//a[@href='/contact_us']");
  expect(contactUsButton).not.toBeNull()
  //Click on "Contact Us"
  await contactUsButton.click()
  //Check that the "Contact us" page has been opened
  await expect(page).toHaveURL("https://automationexercise.com/contact_us")
  //Check that "Get in touch" title is visible
  const getInTouchTitle = await page.$("//h2[text()='Get In Touch']");
  expect(getInTouchTitle).not.toBeNull()
  //Enter data in Name, Email, Subject, "Message" fields
  await page.fill("//input[@name='name']", "Marry Smith")
  await page.fill("//input[@name='email']", "getelax839@pokeline.com")
  await page.fill("//input[@name='subject']", "Familiarizing")
  await page.fill("//textarea[@name='message']", "Hi. I am Marry Smith, the owner of the \"Style\" company.")
  //Upload a file
  const filePath = "C:\\Users\\Quantaria\\Desktop\\1234.txt"
  await page.setInputFiles("//input[@type='file']", filePath)
  //Click on "Submit"
  //Clicking on Submit is not working, do not know why
  //Tried force click, click via querySelector, and clicks by coordinates result the same
  const submitButton = await page.$("//input[@name='submit']");
  await submitButton.isVisible()
  await submitButton.click()
  //Click on "Ok" button on alert
  page.on("dialog", async dialog => {
    expect(dialog.type()).toBe("confirm")
    expect(dialog.message()).toBe("Press OK to proceed!")
    await dialog.accept()
  })
  //Check that "Success" message is visible
  const successIsVisible = await page.isVisible("//div[@class='contact-form']//div[@style]")
  expect(successIsVisible).toBe(true)

  //Click on "Home" button and check that this page has been loaded
  await page.click("//span[text()=\" Home\"]")
  await expect(page.locator("//img[@alt=\"Website for automation practice\"]")).toBeVisible()
});

test('Test Case 8: Verify All Products and product detail page', async ({page}) => {
  //Open AutomationExercise page
  await page.goto('http://automationexercise.com/');

  //Check that the page has been loaded
  await expect(page.locator("//img[@alt=\"Website for automation practice\"]")).toBeVisible()

  //Click on "Products" button
  const productsButton = await page.$("//a[@href='/products']");
  await productsButton.isVisible()
  await productsButton.click()

  //Check that the user is on "All products" page
  await page.waitForSelector('//h2[text()=\'All Products\']', { state: 'visible' });
  const allProductsTitle = await page.$("//h2[text()='All Products']");
  await allProductsTitle.isVisible()

  //CHeck that the product list is visible
  //Since this is not the list, but separate elements
  //Verification is in the loop
  const productList = await page.$$("//div[@class='col-sm-4']");
  for(const element of productList) {
    await element.isVisible()
  }
  //Click on the "View product" on first product in the list
  const firstElementInProductList = await page.$("//a[@href='/product_details/1']");
  await firstElementInProductList.click()
  //Check that the user is on products page
  //Check that the next elements are visible:
  //name, category, price, availability, condition, brand
  await page.waitForSelector('//h2[text()=\'Blue Top\']', { state: 'visible' });
  const productsName = await page.$("//h2[text()='Blue Top']");
  await productsName.isVisible()
  const productsCategory = await page.$("//p[contains('Category', text())]");
  await productsCategory.isVisible()
  const productsPrice = await page.$("//span[text()='Rs. 500']");
  await productsPrice.isVisible()
  const productsAvailability = await page.$("//b[text()='Availability:']//parent::p");
  await productsAvailability.isVisible()
  const productsCondition = await page.$("//b[text()='Condition:']//parent::p");
  await productsCondition.isVisible()
  const productsBrand = await page.$("//b[text()='Brand:']//parent::p");
  await productsBrand.isVisible()
})

test('Test Case 9 : Search Product', async ({page}) => {
  //Open AutomationExercise page
  await page.goto('http://automationexercise.com/');

  //Check that the page has been loaded
  await expect(page.locator("//img[@alt=\"Website for automation practice\"]")).toBeVisible()

  //Click on "Products" button
  const productsButton = await page.$("//a[@href='/products']");
  await productsButton.isVisible()
  await productsButton.click()

  //Check that the user is on "All products" page
  await page.waitForSelector('//h2[text()=\'All Products\']', { state: 'visible' });
  const allProductsTitle = await page.$("//h2[text()='All Products']");
  await allProductsTitle.isVisible()

  //Input "Search" is visible, and then enter "Fancy Green Top" in it
  const searchField = await page.$("//input[@name='search']");
  await searchField.isVisible()
  await page.fill("//input[@name='search']", "Fancy Green Top")

  //Click on "Submit search" button
  const submitSearch = await page.$("//button[@id='submit_search']");
  await submitSearch.click()

  //Title "Searched products" is visible
  await page.waitForSelector('//h2[@class=\'title text-center\']', { state: 'visible'})
  const searchedProductsTitle = await page.$("//h2[@class='title text-center']");
  await searchedProductsTitle.isVisible()

  //CHeck that the results are visible
  //Since this is not the list, but separate elements
  //Verification is in the loop
  const productList = await page.$$("//div[@class='col-sm-4']");
  for(const element of productList) {
    await element.isVisible()
  }
})

test('Test Case 10 : Verify Subscription on home page', async ({page}) => {
  //Open AutomationExercise page
  await page.goto('http://automationexercise.com/');

  //Check that the page has been loaded
  await expect(page.locator("//img[@alt=\"Website for automation practice\"]")).toBeVisible()

  //Scroll to the bottom of the page
  await page.evaluate(() => {
    window.scroll(0, document.body.scrollHeight)
  })

  //Check that the "Subscription" element is displayed
  //ANd contains "Subscription" text
  const subscriptionTitle = await page.$("//div[@class='single-widget']//h2")
  await subscriptionTitle.isVisible()
  const subscriptionTitleText = await subscriptionTitle?.textContent()
  expect(subscriptionTitleText).toBe("Subscription")

  //Enter email address in subscription field
  await page.fill("//input[@id='susbscribe_email']", "getelax839@pokeline.com")
  //And click on arrow button
  const arrowButton = await page.$("//button[@id='subscribe']")
  await arrowButton.click()

  //"You have been successfully subscribed" is displayed
  const successfullSubscriptionMessage = await page.$("//div[@id='success-subscribe']//div")
  await successfullSubscriptionMessage.isVisible()
})

test('Test Case 23 : Verify address details in checkout page', async ({page}) => {
  //Open AutomationExercise page
  await page.goto('http://automationexercise.com/');

  //Check that the page has been loaded
  await expect(page.locator("//img[@alt=\"Website for automation practice\"]")).toBeVisible()

  //Click on "Sign up/login" button
  const submitSearch = await page.$("//a[@href='/login']");
  await submitSearch.click()

  //Fill name and email in "name" and "Email" fields
  const userName = "Anny"
  await page.fill("//input[@data-qa='signup-name']", userName)
  await page.fill("//input[@data-qa='signup-email']", "getelax832@pokeline.com")

  //Click on "Signup" button
  const signUpButton = await page.$("//button[@data-qa='signup-button']");
  await signUpButton.click()

  await page.waitForTimeout(1000)
  //check that the user is on registration page
  await page.waitForSelector('//b[text()=\'Enter Account Information\']', { state: 'visible' });
  const subscriptionTitle = await page.$("//b[text()='Enter Account Information']")
  await subscriptionTitle.isVisible()

  //Select gender
  await page.waitForSelector('//label[@for=\'id_gender2\']', { state: 'visible' });
  const gender = await page.$("//label[@for='id_gender2']");
  await gender.click()

  //Enter password
  await page.fill("//input[@type='password']", "123456")

  //Fill address information
  const firstName = "Anny"
  const lastName = "Black"
  const country = "Canada"
  const address = "TestLab"
  const state = "Ontario"
  const city = "Toronto"
  const zipcode = "123789"
  const mobileNumber = "+1(343)123 1234"

  await page.fill("//input[@data-qa='first_name']", firstName)
  await page.fill("//input[@data-qa='last_name']", lastName)
  await page.fill("//input[@data-qa='address']", address)
  await page.fill("//input[@data-qa='state']", state)
  await page.fill("//input[@data-qa='city']", city)
  await page.fill("//input[@data-qa='zipcode']", zipcode)
  await page.fill("//input[@data-qa='mobile_number']", mobileNumber)

  //Select country
  const countryDropdown = await page.$("//select[@data-qa='country']")
  await countryDropdown.selectOption("Canada")

  //Click on "Create account" button
  const createAccountButton = await page.$("//button[@data-qa='create-account']");
  await createAccountButton.click()

  //Check title "Account created"
  await page.waitForSelector('//div[@class=\'single-widget\']//h2', { state: 'visible' });
  const accountCreatedTitle = await page.$("//div[@class='single-widget']//h2")
  await accountCreatedTitle.isVisible()
  const accountCreatedTitleText = await accountCreatedTitle?.textContent()
  expect(accountCreatedTitleText).toBe("Subscription")

  //Click on "Continue" button
  const continueButton = await page.$("//a[@data-qa='continue-button']");
  await continueButton.click()

  //Check "Logged as a [user]
  await page.waitForSelector('//a[text()=\' Logged in as \']', { state: 'visible' });
  const loggedAsAUser = await page.$("//a[text()=' Logged in as ']")
  await loggedAsAUser.isVisible()
  const loggedAsAUserText = await loggedAsAUser?.textContent()
  //The text contains "Logged as a" and [Username] text
  const containsUsername = loggedAsAUserText?.includes(userName)
  const containsLoggedText = loggedAsAUserText?.includes("Logged in as")
  expect(containsLoggedText).toBe(true)
  expect(containsUsername).toBe(true)

  //Click on "Add to cart" button
  const addToCartButton = await page.$("//a[text()='Add to cart' and @data-product-id='1']");
  await addToCartButton.click()

  //Click on "Continue shopping" button on modal window
  const continueShoppingButton = await page.$("//button[text()='Continue Shopping']");
  await continueShoppingButton.click()

  //Go to cart
  const cartButton = await page.$("//a[text()=' Cart']");
  await cartButton.click()

  //Check that the cart page is displayed
  const cartInfo = await page.$("//div[@class='table-responsive cart_info']")
  await cartInfo.isVisible()

  //Click on "Proceed to checkout" button
  const proceedToCheckoutButton = await page.$("//a[text()='Proceed To Checkout']");
  await proceedToCheckoutButton.click()

  //Check that delivery address corresponds to info from register
  const usernameInDelivery = await page.$("//ul[@id='address_delivery']//li[@class='address_firstname address_lastname']")
  const userNameInDeliveryText = await usernameInDelivery?.textContent()
  expect(userNameInDeliveryText?.includes(userName)).toBe(true)

  const addressInDelivery = await page.$("//ul[@id='address_delivery']//li[@class='address_city address_state_name address_postcode']")
  const addressInDeliveryText = await addressInDelivery?.textContent()
  expect(addressInDeliveryText?.includes(state)).toBe(true)
  expect(addressInDeliveryText?.includes(city)).toBe(true)
  expect(addressInDeliveryText?.includes(zipcode)).toBe(true)

  const phoneInDelivery = await page.$("//ul[@id='address_delivery']//li[@class='address_phone']")
  const phoneInDeliveryText = await phoneInDelivery?.textContent()
  expect(phoneInDeliveryText).toBe(mobileNumber)

  const countryInDelivery = await page.$("//ul[@id='address_delivery']//li[@class='address_country_name']")
  const countryInDeliveryText = await countryInDelivery?.textContent()
  expect(countryInDeliveryText).toBe(country)

  //Check that billing address corresponds to info from register

  const usernameInBilling = await page.$("//ul[@id='address_invoice']//li[@class='address_firstname address_lastname']")
  const userNameInBillingText = await usernameInBilling?.textContent()
  expect(userNameInBillingText?.includes(userName)).toBe(true)

  const addressInBilling = await page.$("//ul[@id='address_invoice']//li[@class='address_city address_state_name address_postcode']")
  const addressInBillingText = await addressInBilling?.textContent()
  expect(addressInBillingText?.includes(state)).toBe(true)
  expect(addressInBillingText?.includes(city)).toBe(true)
  expect(addressInBillingText?.includes(zipcode)).toBe(true)

  const phoneInBilling = await page.$("//ul[@id='address_invoice']//li[@class='address_phone']")
  const phoneInBillingText = await phoneInBilling?.textContent()
  expect(phoneInBillingText).toBe(mobileNumber)

  const countryInBilling = await page.$("//ul[@id='address_invoice']//li[@class='address_country_name']")
  const countryInBillingText = await countryInBilling?.textContent()
  expect(countryInBillingText).toBe(country)

  //Click on "Delete account" button
  const deleteAccountButton = await page.$("//a[@href='/delete_account']");
  await deleteAccountButton.click()

  //"Account deleted" title verification
  const accountDeletedTitle = await page.$("//b[text()='Account Deleted!']")
  await accountDeletedTitle.isVisible()
  const accountDeletedTitleText = await accountDeletedTitle?.textContent()
  expect(accountDeletedTitleText).toBe("Account Deleted!")

  //Click on "Continue" button
  const continueButtonOnDuringDelete = await page.$("//a[@data-qa='continue-button']")
  await continueButtonOnDuringDelete.click()
})