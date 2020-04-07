# Visitor-Management-App (CUI template)
This application helps you manage all your day to day data entries in a single space. In this technology era, we provide the best tool for managing records for Employees, Visitors, and Couriers. This results in saving of paper and makes your organization keep pace with the changing future. There is also an Admin panel that helps you to maintain records.

### Salient Features

- Visitor and employee tracking
- User-friendly interface
- Cost-effective
- Admin panel to view the daily entries
- Timely updates and support
- Email updates

This is a starter CUI template for AgileApps platform. It contains the [AgileApps application package](https://github.com/agileapps-dev-com/Visitor-Management-App/tree/master/packages/application), [CUI template](https://github.com/agileapps-dev-com/Visitor-Management-App/tree/master/packages/cui-template), CUI template [source code](https://github.com/agileapps-dev-com/Visitor-Management-App/tree/master/template/source).

## Prerequisites:
   * Knowledge of AgileApps platform.
   * Knowledge of Angular framework.
## Supported AgileApps Platform Versions   
   *  10.13.4 and later
## Usage instructions
### Installing the Application
- Install the [AgileApps application package](https://github.com/agileapps-dev-com/Visitor-Management-App/tree/master/packages/application) (visitor-management.zip) by performing the following steps:
- After you login to AgileApps, Go to Settings > Administration > Account Management > Packages > Install from file.
- Select the visitor-management.zip file and install the application.

### How to use Proxy 
- Using **proxy.conf.json** networking target url to proxy to any AgileApps environment.

### Start the Application
- Use <b>ng serve</b> command.

### Build the Application
- After the implementation of this application, run the following command to build the application:
```javascript
ng build --prod
```

 As part of this build, it generates compiled artifacts in <b>dist</b> folder. Following is the file structure of the Angular application after the build is complete:
```javascript
├───visitor-management
|   ├───dist
│   |   ├───visitor-management
|   |   |    ├───compiled artifacts
|   |   |    ├───index.html
│   ├   |    └───template-details.json (Need to create manually)
│   ├───node_modules
│   ├───src
│   |   ├───app
|   |   |    app-routing.module.ts
|   |   |    app.component.css
|   |   |    app.component.html
|   |   |    app.component.spec.ts
|   |   |    app.component.ts
|   |   |    app.module.ts
│   |   │    
│   |   ├───index.html
│   |   └───assets
│   |        css
|   |        img
```
- After a successful build, create the <b>template-details.json</b> file manually with the following content. It should have a unique name and a version as well.
```javascript
{
  name: 'visitormanagement',
  version: '1.0'
}
```

### Deploy the Application as a Template
Create a zip folder for <b>visitor-management</b> which is present inside the <b>dist</b> folder and upload it as a template by following the steps mentioned in [deployment](https://docs.webmethods.io/AgileApps/getting_started/deployment/#gsc.tab=0)
## Disclaimer
Refer to the [licence](LICENSE) terms and conditions.
