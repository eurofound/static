# COVID-19 EU PolicyWatch database

Eurofound's COVID-19 EU PolicyWatch collates information on the responses of government and social partners to the crisis, as well as gathering examples of company practices aimed at mitigating the social and economic impacts.

This repository provides access to the raw dataset, which is updated in irregular intervals.
* [More information on the Eurofound website](https://www.eurofound.europa.eu/data/covid-19-eu-policywatch)
* [PowerBI dashboard of the data](https://www.eurofound.europa.eu/data/covid-19-eu-policywatch/database)

## Structure of the JSON file
The JSON file consists of all cases in the database. A case has both single attributes (such as title, start date or category) and multiple attributes (such as actors, target groups or sectors). 

Single attributes are below the `fieldData` object:
* `title`: The title of a case (English)
* `title_nationalLanguage`: The title of a case (national language)
* `d_startDate`: Start date
* `d_endDate`: End date
* `calc_country`: Country
* `territorialScope`: Territorial scope
* `calc_minorCategory`: Category
* `calc_subMinorCategory`: Subcategory
* `calc_identifier`: Identifier
* `dateType`: Date type (temporary / open ended)
* `calc_creationDay`: Date when case was added to database
* `calc_lastUpdate`:  Date when case was last updated
* `descriptionBackgroundInfo`: Free text, background information
* `descriptionContentOfMeasure`: Free text, content of the measure
* `descriptionUseOfMeasure`: Free text, use of the measure
* `descriptionViewsOfSocialPartners`: Free text, views of social partners
* `socialPartner_form`: Form of social partner involvement
* `socialPartner_role`: Role of social partners
* `calc_githubURL`: Link to HTML factsheet
* `isOccupation`: Is occupation specific?
* `isSector`: Is sector specific?
* `sector_privateOrPublic`: Private or public sector?
* `calc_type`: Type of measure
* `statusOfRegulation`: Status of the regulation

Multiple choice attributes are below the `portalData` object:
* `sources`: Title, URL and date to the source of information
* `actors`: Types of actors involved in the measure
* `targetGroups`: Groups the measure is targeted at
* `funding`: Types of funding required for the measure
* `occupations`: If `isOccupation` is 'Yes', then list of ISCO-08 occupations
* `sectors`: If `isSector` is 'Yes', then list of NACE level 2 sectors
* `regions`: If `territorialScope` is not 'Applies nationwide', then list of NUTS regions
* `updates`: Date and free text of updates implemented after measure came into effect


## Structure of the CSV file
Refer to column headers.
