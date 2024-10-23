package fr.gouv.sante.c2s.web.filter.xss;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import fr.gouv.sante.c2s.security.SecurityService;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import lombok.SneakyThrows;
import org.springframework.util.StreamUtils;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Function;

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

    private SecurityService securityService;
    private String body = null;

    public XssHttpServletRequestWrapper(HttpServletRequest request, SecurityService securityService) throws IOException {
        super(request);
        this.securityService = securityService;
        InputStream requestInputStream = request.getInputStream();
        this.body = applyFunctionToJsonValues(StreamUtils.copyToString(requestInputStream, StandardCharsets.UTF_8), s -> securityService.stripXSS(s));
    }

    @Override
    public String getParameter(String name) {
        String value = super.getParameter(name);
        return stripXSS(value);
    }

    @Override
    public String[] getParameterValues(String name) {
        String[] values = super.getParameterValues(name);
        if (values != null) {
            for (int i = 0; i < values.length; i++) {
                values[i] = stripXSS(values[i]);
            }
        }
        return values;
    }

    @Override
    public Map<String, String[]> getParameterMap() {
        Map<String, String[]> originalMap = super.getParameterMap();
        Map<String, String[]> cleanedMap = new TreeMap<String, String[]>(); // Just to keep the map sorted
        for (String key : originalMap.keySet()) {
            String[] values = originalMap.get(key);
            for (int i = 0; i < values.length; i++)  {
                values[i] = stripXSS(values[i]);
            }
            cleanedMap.put(key, values);
        }
        return cleanedMap;
    }

    private String stripXSS(String value) {
        // Your XSS stripping logic goes here
        return this.securityService.stripXSS(value);
    }

    public static String applyFunctionToJsonValues(String jsonString, Function<String, String> function) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(jsonString);
        applyFunction(jsonNode, function);
        return jsonNode.toString();
    }

    public static void applyFunction(JsonNode jsonNode, Function<String, String> function) {
        if (jsonNode.isArray()) {
            ArrayNode arrayNode = (ArrayNode) jsonNode;
            for (JsonNode node : arrayNode) {
                applyFunction(node, function);
            }
        } else if (jsonNode.isObject()) {
            ObjectNode objectNode = (ObjectNode) jsonNode;
            Iterator<Map.Entry<String, JsonNode>> fieldsIterator = objectNode.fields();
            while (fieldsIterator.hasNext()) {
                Map.Entry<String, JsonNode> field = fieldsIterator.next();
                JsonNode valueNode = field.getValue();
                // recursively apply function to nested objects
                if (valueNode.isObject() || valueNode.isArray()) {
                    applyFunction(valueNode, function);
                } else if (valueNode.isTextual()) {
                    String oldValue = valueNode.asText();
                    String newValue = function.apply(oldValue);
                    objectNode.set(field.getKey(), new TextNode(newValue));
                }
            }
        } else if (jsonNode.isTextual()) {
            String newValue = function.apply(jsonNode.asText());
            jsonNode = new TextNode(newValue);
        }
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body.getBytes());
        ServletInputStream servletInputStream = new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
            }


            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public boolean isFinished() {
                return byteArrayInputStream.available() == 0;
            }

            @Override
            public void setReadListener(ReadListener readListener) {

            }
        };
        return servletInputStream;
    }

    @SneakyThrows
    @Override
    public BufferedReader getReader() {
        return new BufferedReader(new InputStreamReader(this.getInputStream()));
    }
}
