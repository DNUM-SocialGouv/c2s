package fr.gouv.sante.c2s.json;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Service
public class JsonService {

    private Gson getPrettyGson() {
        return new GsonBuilder()
                .setPrettyPrinting()
                .setDateFormat("yyyy-MM-dd hh:mm:ss").create();
    }

    public void saveObjectToFile(Object object, File file) throws IOException {
        Gson gson = getPrettyGson();
        try (Writer writer = Files.newBufferedWriter(file.toPath(), StandardCharsets.UTF_8)) {
            JsonElement tree = gson.toJsonTree(object);
            gson.toJson(tree, writer);
        }
    }

}
