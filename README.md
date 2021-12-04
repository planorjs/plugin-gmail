# plugin-gmail
Planor Gmail plugin.

## Usage
```js
import PlanorServiceGmail from '@planorjs/plugin-gmail'

const credentials = {
  sender: 'test@test.com',
  gcloudProject: 'project-name',
  googleApplicationCredentials: '/path/to/googleCloudServiceAccount.json'
}

const service = new PlanorServiceGmail(credentials)
```

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀
