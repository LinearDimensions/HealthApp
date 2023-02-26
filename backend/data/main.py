import export as export
from PyPDF2 import PdfReader
import os
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
#from google.cloud import translate_v2 as translate
import yake
import pandas as pd
from fuzzywuzzy import fuzz
import rapidfuzz
import csv

directory = r"./data/pdfs"


def main(*args):
    data = pd.DataFrame(df_generator(), columns=['Article', 'KeyWords'])
    search_str = ' '
    # concatenate the search strings into a list
    for a in args:
        search_str += a + ' '
    # create a scoring list
    score_list = []
    curr_ratio = 0
    flat_list = []
    for i in range(len(data)):
        key_str = ''
        curr_ratio = 0
        for sublist in data.at[0, 'KeyWords']:
            flat_list.append(sublist)
        for j in range(len(flat_list)):
            key_str += flat_list[j]
        curr_ratio = rapidfuzz.fuzz.WRatio(search_str, key_str)
        score_list.append([i, curr_ratio])
    # once the entire dataframe has been searched, return the top 9 indices to render results
    score_list_final = sorted(score_list, key=lambda x: x[1])
    # slice the top 9 indices as an array
    top_9 = score_list_final[:9]
    top_9_indices = []
    for i in range(len(top_9)):
        top_9_indices.append(top_9[i][0])
    return data.iloc[top_9_indices]

def df_generator():
    directory_here = r"./data/pdfs"
    lst = []
    for i in os.scandir(directory_here):
        lst.append([str(i.name), keyword_return_special(i.name, 10)])
    return lst

def data_to_csv():
    data = pd.DataFrame(df_generator(), columns=['Article', 'KeyWords'])
    data.to_csv('file_data2.csv', encoding='utf-16', sep='\t')

"""Translates text into the target language.

    Make sure your project is allowlisted.

    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    
#def translate_text_with_model(target, text, model="nmt"):
    translate_client = translate.Client()

    if isinstance(text, bytes):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=target, model=model)
    return result


#def summary_generator(document, language):
    global directory
    summary_return = ''
    for i in os.scandir(directory):
        if i.name == document:
            break
    if i.name != document:
        print("Requested File has been moved or deleted")
        return ModuleNotFoundError
    file1 = open(i.path, "rb")
    file1_pdf = PdfReader(file1)
    for j in range(len(file1_pdf.pages)):
        text = file1_pdf.pages[j].extract_text()
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LexRankSummarizer()
        summary = summarizer(parser.document, sentences_count=5)
        # Print the summary
        for sentence in summary:
            summary_return += str(sentence)
    file1.close()
    if language != "en":
        summary_return = translate_text_with_model(target=language, text=summary_return, model="nmt")
    return summary_return


# Use yake to extract keywords from the articles
#def keyword_return(document, language):
    global directory
    return_keys = []
    for i in os.scandir(directory):
        if i.name == document:
            break
    if i.name != document:
        print("Requested File has been moved or deleted")
        return ModuleNotFoundError
    file1 = open(i.path, "rb")
    file1_pdf = PdfReader(file1)
    text = []
    str1 = ''
    for x in range(len(file1_pdf.pages)):
        text.append(file1_pdf.pages[x].extract_text())

    text2 = str1.join(text[x] for x in range(len(text)))
    file1.close()
    kw_extractor = yake.KeywordExtractor(lan="en", top=10)
    keywords = kw_extractor.extract_keywords(text2)
    for i in enumerate(keywords):
        return_keys.append(i[1][0])
    if language != "en":
        for x in enumerate(return_keys):
            translate_text_with_model(language, x)
    return return_keys
"""

def keyword_return_special(document, num_terms):
    return_keys = []
    global directory
    for i in os.scandir(directory):
        if i.name == document:
            break
    if i.name != document:
        print("Requested File has been moved or deleted")
        return ModuleNotFoundError
    file1 = open(i.path, "rb")
    file1_pdf = PdfReader(file1)
    text = []
    str1 = ''
    for x in range(len(file1_pdf.pages)):
        text.append(file1_pdf.pages[x].extract_text())

    text2 = str1.join(text[x] for x in range(len(text)))
    file1.close()
    kw_extractor = yake.KeywordExtractor(lan="en", top=num_terms)
    keywords = kw_extractor.extract_keywords(text2)
    for i in enumerate(keywords):
        return_keys.append(i[1][0])
    return return_keys


def summary_generator_special(document, nlines):
    global directory
    summary_return = ''
    for i in os.scandir(directory):
        if i.name == document:
            break
    if i.name != document:
        print("Requested File has been moved or deleted")
        return ModuleNotFoundError
    file1 = open(i.path, "rb")
    file1_pdf = PdfReader(file1)
    for j in range(len(file1_pdf.pages)):
        text = file1_pdf.pages[j].extract_text()
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LexRankSummarizer()
        summary = summarizer(parser.document, sentences_count=nlines)
        # Print the summary
        for sentence in summary:
            summary_return += str(sentence)
    file1.close()
    return str(summary_return)


print(main('Cardiology Cardiovascular', 'Cardiovascular Risk', 'CCB', 'ACEI', 'blood pressure'))
