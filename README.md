# Digiroad Updates Source plugin

Fetches Digiroad changes from Finnish Road AUthority API.

VV API:

https://avoinapi.vaylapilvi.fi/tnits/public/download/queryDataSets

Wrong VV location:

```
<RoadFeature>
<validFrom>2022-04-22</validFrom>
<beginLifespanVersion>2022-04-22T12:44:24.000Z</beginLifespanVersion>
<updateInfo>
<UpdateInfo>
<type>Modify</type>
</UpdateInfo>
</updateInfo>
<source xlink:href="http://spec.tn-its.eu/codelists/RoadFeatureSourceCode#regulation" xlink:title="regulation"/>
<type xlink:href="http://spec.tn-its.eu/codelists/RoadFeatureTypeCode#speedLimit" xlink:title="speedLimit"/>
<properties>
<GenericRoadFeatureProperty>
<type xlink:href="http://spec.tn-its.eu/codelists/RoadFeaturePropertyTypeCode#maximumSpeedLimit" xlink:title="maximumSpeedLimit"/>
<value>40</value>
<valueReference xlink:href="http://spec.tn-its.eu/codelists/UOMIdentifierCode#kph" xlink:title="kph"/>
</GenericRoadFeatureProperty>
</properties>
<id>
<RoadFeatureId>
<providerId>FI.LiVi.OTH</providerId>
<id>2352051</id>
</RoadFeatureId>
</id>
<locationReference>
<OpenLRLocationReference>
<binaryLocationReference>
<BinaryLocationReference>
<base64String>Cw/d7ir1ohtuAgBc/4kbHg==</base64String>
<openLRBinaryVersion xlink:href="http://spec.tn-its.eu/codelists/OpenLRBinaryVersionCode#v2_4" xlink:title="v2_4"/>
</BinaryLocationReference>
</binaryLocationReference>
</OpenLRLocationReference>
</locationReference>
<locationReference>
<GeometryLocationReference>
<encodedGeometry>
<gml:LineString gml:id="_0c5d2f15-9e6e-452b-8a10-3ae24afe0909" srsDimension="2" srsName="EPSG:4326">
<gml:posList>22.31375500029231 60.410607052086995 22.313304390631444 60.41118856492747 22.31294924554478 60.411640851080854 22.31283537534545 60.41179461107245</gml:posList>
</gml:LineString>
</encodedGeometry>
</GeometryLocationReference>
</locationReference>
</RoadFeature>
```