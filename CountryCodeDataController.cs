using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.BackOffice.Filters;
using Umbraco.Cms.Web.Common.Attributes;
using UmbracoMongoSmsDataServices;

namespace UmbracoMongoContactNumber
{
	[ValidateAngularAntiForgeryToken]
	[IsBackOffice]
	[PluginController("UmbracoMongoContactNumber")] //backoffice/UmbracoMongoContactNumber/CountryCodeDataApi/GetCountryPhoneCodeDataDictionary
	public class CountryCodeDataApiController : UmbracoAuthorizedJsonController
	{
		[HttpGet]
		public string GetCountryPhoneCodeDataDictionary()
		{
			return JsonConvert.SerializeObject(SmsDataService.GetAllCountryPhoneCodesDictionary);
		}
	}
}
