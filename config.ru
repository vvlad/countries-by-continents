require 'rack'
use Rack::Static, urls: [''], root: 'public', index: 'index.html'

app = proc do
  [404, {}, ['Not found']]
end

run app
