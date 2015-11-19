package com.toro.map

import com.toro.map.exception.ServiceNotAvailableException;

class GoogleMapsClient {
	final String endpoint = "https://maps.googleapis.com/maps/api"
	String service
	String output
	String key
	
	def send = { params ->
		def lst = []
		params.each{ k, v ->
			lst << "${k}=${v}"
		}
		def p = lst.join('&')
		try{
			def m = convertToMap(new XmlSlurper().parse("${endpoint}/${service}/${output}?${p}&key=${key}"))
			return m
		}catch(all){
			println 'Service not available'
		}
		return null
	}
	
	private def convertToMap(nodes) {
		nodes.children().collectEntries {
			[ it.name(), it.childNodes() ? convertToMap(it) : it.text() ]
		}
	}
}
