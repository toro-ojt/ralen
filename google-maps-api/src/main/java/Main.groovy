import com.toro.map.GoogleMapsClient;
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*

class Main {
	static void main(args){
//		GoogleMapsClient gc = new GoogleMapsClient(
//			service: 'distancematrix', 
//			output:'xml', 
//			key: 'AIzaSyC4qkyS9aODOeClEqzEfpiSyibEBHP3Lcs'
//		)
//		def lol = gc.send([origins:'Vancouver+BC|Seattle',destinations:'San+Francisco|Victoria+BC&key'])
//		lol.each{k, v ->
//			println "${k} : ${v}"
//		}
		
		def url = "http://localhost:8080/"
		def pathPrefix = ""
		
		def http = new HTTPBuilder(url)
		def profile = http.request(GET, JSON) { req ->
			uri.path = "/candidates/564c3304a82656e348dd82fa"
			response.success = {resp, xml ->
				xml
			}
		}
		
		profile.firstName = "Rafael"
		
		// this is not fine (i have 400 Bad Request)
		// because it sends body not in XML
		def savedProfile = http.request(PUT, JSON) { req ->
			uri.path = "/candidates/564c3304a82656e348dd82fa"
			body = profile
			response.success = {resp, xml ->
				xml
			}
		}
	}
}	
