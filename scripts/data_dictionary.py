import click
import json
import os

@click.command()
@click.argument('schema')
@click.argument('version')
def data_dictionary(schema, version):
    path = os.path.join(os.pardir, 'schemas', schema, 'schemas', version, 'schema.json')
    print path
    with open(path, 'rb') as schema:
       js = json.loads(schema.read())

       def parse_schema(item, js=js, indent=1):
           name, options = item

           ref = options.get('$ref')

           if ref:
               key = ref.split('/')[-1]
               options = js.get('definitions', {})[key]

           element_type = options.get('type', '');
           description = options.get('description', 'No description.')

           if isinstance(element_type, list):
               element_type = ', '.join(element_type)

           spaces = ' ' * indent

           click.echo('{spaces}- **{name} {type}**: {description}'.format(**{
            "spaces": spaces,
            "name": click.style(name, fg='cyan'),
            "type": click.style('({})'.format(element_type), fg='yellow'),
            "description": click.style(description, dim=True),
           }))


       version_text = '# IncidentJSON version: {}.'.format(version)
       click.secho(version_text, bg='blue')
       click.echo()

       def parse(sch, indent=1):
           arrays = []

           properties =  sch.get('properties', {})

           ref = sch.get('$ref')

           if ref:
               key = ref.split('/')[-1]
               properties = js.get('definitions', {})[key]

           for name, item in properties.items():

               for array in item.get('items', []):
                   arrays.append({'name': name, 'vals': array})

               if item.get('properties'):
                   arrays.append({'name': name, 'vals': item})

               if not item.get('items'):
                   parse_schema((name, item), indent=indent)

           for i in sch.get('items', []):
               parse(i)

           for array in arrays:
               print

               spaces = '#' * (indent + 2)

               print spaces + ' ' + array['name'].title()
               print
               parse(array['vals'], indent=indent + 2)


       for key, value in js['properties'].items():
           ref = value.get('$ref')
           if ref:
               key = ref.split('/')[-1]
               value = js.get('definitions', {})[key]

           table = '## {title} {type}'.format(title=key.title(),
            type=click.style('(' + value.get('type', '') + ')', fg='yellow')
           )
           click.echo(table)
           parse(value)
           print ''

if __name__ == '__main__':
    data_dictionary()
