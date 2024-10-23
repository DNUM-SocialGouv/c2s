package fr.gouv.sante.c2s.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileOperation {

    private File file;
    private String error;

    private String fileName;
    private String extension;
    private Long size;
    private String directory;

}
