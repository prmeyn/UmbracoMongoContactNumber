# UmbracoMongoContactNumber

The property editor stores phone numbers as JSON, so for example a Danish phone number `31788834` will be saved in the following format:
```json
{
	CountryCodeAndPhoneCode: "dk#45",
	ContactNumber: 31788834""
}
```